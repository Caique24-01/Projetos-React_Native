import { createContext, useEffect, useState } from "react";
import { pegarProdutos, removerProduto, salvarProduto } from "../requisicoes/produtos";

export const ProdutosContext = createContext({})

export function ProdutosProvider( {children} ) {

    const [quantidade, setQuantidade] = useState(0)
    const [carrinho, setCarrinho] = useState([])
    const [ultimosVistos, setUltimosVistos] = useState([])
    const [precoTotal, setPrecoTotal] = useState(0)

    useEffect(async () => {
        const resultado = await pegarProdutos()
        setCarrinho(resultado)
        setQuantidade(resultado.length)
    }, [])

    async function viuProduto(produto) {
        setQuantidade(quantidade + 1)

        const resultado = await salvarProduto(produto)

        let novoCarrinho = carrinho
        novoCarrinho.push(resultado)
        setCarrinho(novoCarrinho)

        let novoUltimosVistos = new Set(ultimosVistos)
        novoUltimosVistos.add(produto)
        setUltimosVistos([...novoUltimosVistos])

        let novoPrecoTotal = precoTotal + produto.preco;
        setPrecoTotal(novoPrecoTotal);
    }

    async function finalizarCompra() {
        try {
            carrinho.forEach(async produto => {
                await removerProduto(produto);
            })
            setQuantidade(0);
            setPrecoTotal(0);
            setCarrinho([]);
            return 'Compra finalizada com sucesso!';
        }
        catch(erro) {
            console.log(erro)
            return 'Erro ao finalizar a compra, tente novamente!';
        }
    }

    return (
        <ProdutosContext.Provider value={{
            quantidade,
            carrinho,
            ultimosVistos,
            viuProduto,
            finalizarCompra
        }}>
            {children}
        </ProdutosContext.Provider>
    )
}