import express from "express"
import { prisma } from "./lib/prisma.ts"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000

app.get("/produtos", async (req, res) => {
  try {
    const itens = await prisma.produtos.findMany()
    res.json(itens)

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" })
  }
});

app.post("/produtos", async (req, res) => {
  const { nome, categoria, quantidade } = req.body
  // try {
  const novoItem = await prisma.produtos.create({
    data: { nome, categoria, quantidade: Number(quantidade) }
  });

  res.status(201).json(novoItem)
  // } catch (error) {
  //   res.status(400).json({ error: "Erro ao criar produto" })
  // }
})

app.put("/produtos/:id", async (req, res) => {
  const { id } = req.params
  const { none, categoria, quantidade } = req.body

  try {

    const produtoAtualizado = await prisma.estoque.update(({
      where: { id: Number(id) },
      data: {
        nome,
        categoria,
        quantidade: Number(quantidade)
      }

    }))
    res.json(produtoAtualizado)
  } catch (error) {
    res.status(404).json({ error: "Não foi possivel atualizar o produto" })
  }

})

app.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params; await prisma.delete({
    where: { id: Number(id) }
  })
  res.status(204).send()

})

app.listen(PORT, () => {
  console.log(`👽666:Api chupa-cabra rodando em: http://localhost:${PORT}`)
})