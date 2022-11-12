import { db } from "./SQLite";

export function criaTabela() {
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
            "tb_notas " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);")
    })
}

export async function adicionaNota(nota) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("INSERT INTO tb_notas (titulo, categoria, texto) VALUES (?, ?, ?);", [nota.titulo, nota.categoria, nota.texto],
                () => {
                    resolve("Nota Adicionada com sucesso")
                })
        })
    })
}

export async function atualizaNota(nota) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("UPDATE tb_notas  SET titulo = ?, categoria = ?, texto = ? WHERE id = ? ;", [nota.titulo, nota.categoria, nota.texto, nota.id],
                () => {
                    resolve("Nota Atualizada com sucesso")
                })
        })
    })
}

export async function removeNota(nota) {
    return new Promise((resolve) => {
      db.transaction((transaction) => {
        transaction.executeSql("DELETE FROM tb_notas WHERE id = ?;", [nota.id], () => {
          resolve("Nota removida com sucesso!")
        })
      })
    })
  }

export async function buscaNotas() {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("SELECT * FROM tb_notas ", [],
                (transaction, resultado) => {
                    resolve(resultado.rows._array)
                })
        })
    })
}