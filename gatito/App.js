import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import Rotas from "./src/Rotas";
import TelaPadrao from "./src/componentes/TelaPadrao"
import Reactotron from "reactotron-react-native";

Reactotron.configure().useReactNative().connect()
console.tron = Reactotron

export default function App() {
  return <TelaPadrao>
    <Rotas />
  </TelaPadrao>
}
