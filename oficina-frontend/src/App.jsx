import { Wrench } from "@phosphor-icons/react";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center border-t-4 border-blue-600">
        
        <Wrench size={56} className="text-blue-600 mx-auto mb-4" weight="duotone" />
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Oficina Mecânica
        </h1>
        
        <p className="text-gray-500 mb-8">
          Gerenciamento completo de clientes, veículos e ordens de serviço.
        </p>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition duration-200 w-full shadow-md">
          Acessar Painel
        </button>

      </div>
    </div>
  );
}

export default App;