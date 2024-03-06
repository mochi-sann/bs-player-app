import "./App.css";
import { MusicPlayer } from "./Components/MusicPlayer";
import { I18nProvider } from "./Components/Provider/I18n";
import { Layout } from "./Components/views/Layout";

function App() {
  return (
    <I18nProvider>
      <Layout>
        <div className="container">
          <MusicPlayer />
        </div>
      </Layout>
    </I18nProvider>
  );
}

export default App;
