import api from "../api";

export async function pegarRepositoriosDoUsuario(id) {
    try {
        const resultado = await api.get(`/repos?postId=${id}`)
        return resultado.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function salvarRepositoriosDoUsuario(postId, name, data, id) {
    try {
        await api.put(`/repos/${id}`, {
            name: name,
            data: data,
            postId: postId,
            id: id
        })
        return "Sucesso"
    } catch (error) {
        console.log(error)
        return 'Erro'
    }
}

export async function criarRepositoriosDoUsuario(postId, name, data) {
    try {
        await api.post(`/repos`, {
            name: name,
            data: data,
            postId: postId
        })
        return "Sucesso"
    } catch (error) {
        console.log(error)
        return 'Erro'
    }
}

export async function deletarRepositoriosDoUsuario(id) {
    try {
        await api.delete(`/repos/${id}`)
        return "Sucesso"
    } catch (error) {
        console.log(error)
        return 'Erro'
    }
}