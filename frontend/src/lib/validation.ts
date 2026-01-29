
/**
 * Remove todos os caracteres não numéricos
 */
export function clearDocument(value: string) {
  return value.replace(/\D/g, '');
}

/**
 * Aplica máscara de CPF: 000.000.000-00
 */
export function maskCPF(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

/**
 * Aplica máscara de CNPJ: 00.000.000/0000-00
 */
export function maskCNPJ(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

/**
 * Valida CPF (Algoritmo do Dígito Verificador)
 */
export function validateCPF(cpf: string): boolean {
  cpf = clearDocument(cpf);
  
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false; // Todos dígitos iguais

  let sum = 0;
  let remainder;

  // Validação 1º Dígito
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  // Validação 2º Dígito
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

/**
 * Valida CNPJ (Algoritmo do Dígito Verificador)
 */
export function validateCNPJ(cnpj: string): boolean {
  cnpj = clearDocument(cnpj);

  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false; // Todos dígitos iguais

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  // Validação 1º Dígito
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  // Validação 2º Dígito
  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
}

/**
 * Busca dados da empresa por CNPJ na BrasilAPI
 */
export async function fetchCNPJ(cnpj: string) {
  const cleanCNPJ = clearDocument(cnpj);
  if (cleanCNPJ.length !== 14) throw new Error('CNPJ inválido');

  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error('CNPJ não encontrado');
      throw new Error('Erro ao consultar CNPJ');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
