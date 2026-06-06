# easyLoadsheet

Mini site estatico para calcular distribuicao de malas nos poroes dos Airbus A319, A320 e A321.

## Variantes

O app permite alternar entre:

```text
A319: H1, H4, H5 - bodega principal H4
A320: H1, H3, H4, H5 - bodega principal H1
A321: H1, H2, H3, H4, H5 - bodega principal H3
```

## Como o calculo funciona

1. Informe o total de malas do voo.
2. Informe o peso total recebido em kg.
3. Informe o parcial em kg por mala.
4. Se a opcao de dividir estiver ativa, informe quantas malas vao em cada porao.
5. O peso de cada porao e calculado assim:

```text
peso do porao = malas no porao x parcial kg por mala
```

Exemplo: 90 malas, 1385 kg e parcial 15,39.

## Sillas no cierre

Se uma silla estiver incluida no cierre, ative a area de sillas e adicione cada silla separadamente com peso e bodega. O calculo soma as sillas e desconta esses valores antes de distribuir as malas.

Exemplo:

```text
Cierre = 90 items / 1385 kg
Silla 1 = 23 kg em H1
Silla 2 = 15 kg em H4
Malas para distribuir = 88 bags / 1347 kg
```

Se as malas forem divididas entre poroes, o app recalcula um novo parcial usando apenas as malas:

```text
novo parcial = peso sem silla / malas sem silla
```

Se todas as malas forem em um unico porao, o app apenas remove a silla do cierre e fecha o peso das malas nesse porao.

As sillas sao alocadas separadamente dentro dos poroes. Informar `1` no campo Silla de H1, H4 ou H5 nao aumenta a quantidade de malas; apenas soma o peso da silla ao total geral do cierre.

O app mostra dois totais:

```text
Total malas = somente as malas distribuidas
Total geral = malas + sillas, para conferir com o peso do cierre
```

## Last Minute Changes

LR carregada na porta soma uma mala e 11 kg. Mala retirada de passageiro que nao embarcou subtrai uma mala e 13 kg.

Exemplo:

```text
2 LR - 1 mala retirada
bags = +1
peso = +9 kg
```

Quando o peso total informado existe, o porao com mais malas vira o fechamento do calculo. Os poroes menores sao calculados pelo parcial e o porao principal recebe o restante do peso total.

Exemplo:

```text
90 - 85 = 5
H4 = 85 malas
H5 = 5 malas
5 x 15,39 = 76,95 = 77 kg
1385 - 77 = 1308 kg
H4 = 1308 kg
H5 = 77 kg
TOTAL = 1385 kg
```

## Publicar no GitHub Pages

1. Crie um repositorio no GitHub.
2. Envie estes arquivos para o repositorio.
3. No GitHub, abra Settings > Pages.
4. Em Branch, escolha `main` e a pasta `/root`.
5. Salve e aguarde o link ficar disponivel.

Depois disso, o site abre no celular como uma pagina normal.
