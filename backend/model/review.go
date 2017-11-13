package model

// Review ...
type Review struct {
	Title   string `json:"title"`
	Comment string `json:"comment"`
	Author  string `json:"author"`
	Star    int    `json:"star"`
	Date    string `json:"date"`
	Version string `json:"version"`
}
