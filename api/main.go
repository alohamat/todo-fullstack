package main

import (
	"fmt"
	"time"

	

)

type Item struct {
	Nome string `json:"nome"`
	Tempo DataDetalhes `json:"tempo"`
	Preco int `json:"preco"`
}

type DataDetalhes struct {
	Horas int `json:"horas"`
	Minutos int `json:"minutos"`
	Segundos int `json:"segundos"`
	Anos int `json:"anos"`
}

func main() {
	agora := time.Now()

	itemexeplo := Item {
		Nome: "Leite",
		Tempo: DataDetalhes{
			Horas: agora.Hour(),
			Minutos: agora.Minute(),
			Segundos: agora.Second(),
			Anos: agora.Year(),
		},
		Preco: 1000,
	}
	fmt.Println(itemexeplo)
}