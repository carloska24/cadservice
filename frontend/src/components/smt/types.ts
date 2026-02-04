export interface SmtFormData {
  // Step 1: Scope
  scopeSmt: boolean;
  scopeTht: boolean;
  scopeStencil: boolean;
  scopeTests: boolean;
  
  // Step 2: Tech Specs
  projectClass: 'class2' | 'class3';
  mountSide: 'top' | 'bottom' | 'both';
  boardWidth: string;
  boardHeight: string;
  layerCount: string;
  quantity: number;
  pcbMaterial: 'fr4' | 'rogers' | 'flex' | 'aluminum' | 'ceramic';
  surfaceFinish: 'hasl' | 'enig' | 'osp' | 'immersion_silver' | 'immersion_tin';
  boardThickness: '0.8' | '1.0' | '1.2' | '1.6' | '2.0' | '2.4';
  leadTime: 'standard' | 'express' | 'urgent';
  
  // Step 3: Files
  bomFile: File | null;
  gerberFile: File | null;
  pickPlaceFile: File | null;
  odbFile: File | null;
  
  // Step 4: Supply Chain
  supplyModel: 'turnkey' | 'consigned' | 'hybrid';
  acceptAlternatives: boolean;
  keepStock: boolean;
  
  // Step 5: Contact
  contactName: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
}
