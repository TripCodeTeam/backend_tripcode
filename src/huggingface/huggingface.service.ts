import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HfInference } from '@huggingface/inference';

// Definimos solo los campos que necesitamos para el análisis de error
export interface ErrorAnalysis {
    description: string;
    status: 'open' | 'inProgress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high' | 'critical';
}

@Injectable()
export class HuggingfaceService {
    private hfInference: HfInference;

    constructor() {
        this.hfInference = new HfInference(process.env.HUGGINGFACE_API_KEY || '');
    }

    async analyzeError(errorInput: string): Promise<ErrorAnalysis> {
        const endpointUrl = 'https://api-inference.huggingface.co/models/facebook/opt-350m';

        const prompt = `Analiza este error de JavaScript y responde solo con un JSON:
ERROR: "${errorInput}"

{
    "description": "Error TypeError: Se intenta acceder a la propiedad name de un objeto undefined. Es necesario validar la existencia del objeto antes de acceder a sus propiedades.",
    "status": "open",
    "priority": "high"
}`;

        try {
            const response = await this.hfInference.textGeneration({
                endpointUrl,
                inputs: prompt,
                parameters: {
                    max_new_tokens: 250,
                    temperature: 0.1,
                    do_sample: false,
                    return_full_text: false,
                    stop: ["\n", "```"]
                },
            });

            console.log("Respuesta del modelo:", response.generated_text);

            // Si no obtenemos una respuesta válida, usamos una respuesta predefinida
            if (!response.generated_text || !response.generated_text.includes('{')) {
                return this.getDefaultErrorAnalysis(errorInput);
            }

            try {
                // Intentamos extraer y parsear el JSON
                const jsonMatch = response.generated_text.match(/\{[\s\S]*\}/);
                if (!jsonMatch) {
                    return this.getDefaultErrorAnalysis(errorInput);
                }

                const analysisResult: ErrorAnalysis = JSON.parse(jsonMatch[0]);

                // Validamos la estructura
                if (this.isValidAnalysis(analysisResult)) {
                    return analysisResult;
                } else {
                    return this.getDefaultErrorAnalysis(errorInput);
                }

            } catch (parseError) {
                console.error('Error al parsear JSON:', parseError);
                return this.getDefaultErrorAnalysis(errorInput);
            }

        } catch (error) {
            console.error('Error llamando a la API de Hugging Face:', error);
            return this.getDefaultErrorAnalysis(errorInput);
        }
    }

    private isValidAnalysis(analysis: any): analysis is ErrorAnalysis {
        const validStatuses = ['open', 'inProgress', 'resolved', 'closed'];
        const validPriorities = ['low', 'medium', 'high', 'critical'];

        return (
            typeof analysis === 'object' &&
            typeof analysis.description === 'string' &&
            validStatuses.includes(analysis.status) &&
            validPriorities.includes(analysis.priority)
        );
    }

    private getDefaultErrorAnalysis(errorInput: string): ErrorAnalysis {
        // Analizar el tipo de error para dar una respuesta más específica
        if (errorInput.includes('Cannot read properties of undefined')) {
            return {
                description: `TypeError detectado: Se está intentando acceder a una propiedad de un objeto undefined. 
                             Problema: ${errorInput}
                             Solución recomendada: 
                             1. Implementar validación previa del objeto
                             2. Usar optional chaining (objeto?.propiedad)
                             3. Proporcionar valores por defecto`,
                status: 'open',
                priority: 'high'
            };
        }

        // Respuesta genérica para otros tipos de errores
        return {
            description: `Error detectado en la aplicación: ${errorInput}. 
                         Se recomienda revisar la inicialización de variables y objetos antes de su uso.`,
            status: 'open',
            priority: 'medium'
        };
    }
}