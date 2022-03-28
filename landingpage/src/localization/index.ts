// import the localization file using en.json, de.json and pt-BR.json
import en from './en.json';
import de from './de.json';
import ptBR from './pt-BR.json';
import LocalizedStrings from 'react-localization';

const Localization = new LocalizedStrings({ en, de, ptBR });

export default Localization;
