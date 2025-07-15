package models

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