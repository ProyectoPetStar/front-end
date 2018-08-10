import { PetIdeas } from "./pet-ideas";
import { PetConsenso } from "./pet-consenso";

export class PetIshikawa {
    id:number;
    que: string;
    donde: string;
    cuando: string;
    como: string;
    problema: string;
    fecha:string;
    nombre_etad: string;
    id_grupo:number;
    id_etad:number;
    causa_raiz: string;
    solucionado:number;
    recurrente:number;
    analisis:number;
    elaborado: string;
    revisado: string;
    autorizado: string;
    estatus:number;
    listIdeas:  Array<PetIdeas> = [];
    listConsenso: Array<PetConsenso>;
}