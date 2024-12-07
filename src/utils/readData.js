import redeSocialData from '../data/rede_social.json';
import internoData from '../data/interno.json';
import lojaAppData from '../data/loja_app.json';

export const getUnifiedData = () => {
  const allData = [
    ...redeSocialData.elogios,
    ...internoData.elogios,
    ...lojaAppData.elogios
  ];
  
  return allData;
};