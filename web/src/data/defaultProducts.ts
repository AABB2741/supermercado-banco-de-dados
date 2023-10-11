import { ProductProps } from "../@types/product-props";

export const defaultProducts: ProductProps[] = [
    { id: 1, name: "Arroz" },
    { id: 2, name: "Feijão" },
    { id: 3, name: "Leite" },
    { id: 4, name: "Ovo" },
    { id: 5, name: "Pão" },
    { id: 6, name: "Banana" },
    { id: 7, name: "Sabonete" },
    { id: 8, name: "Escova de Dentes" },
    { id: 9, name: "Shampoo" },
    { id: 10, name: "Condicionador" },
    { id: 11, name: "Macarrão" },
    { id: 12, name: "Molho de Tomate" },
    { id: 13, name: "Cenoura" },
    { id: 14, name: "Maçã" },
    { id: 15, name: "Frango" },
    { id: 16, name: "Detergente" },
    { id: 17, name: "Esponja" },
    { id: 18, name: "Vela" },
    { id: 19, name: "Lâmpada" },
].sort((a, b) => (a.name > b.name ? 1 : -1));
