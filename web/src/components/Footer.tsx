import { Github, Instagram, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-blue-300 bg-gradient-to-br p-10 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
            <div className="grid gap-8 text-sm leading-relaxed md:text-base lg:grid-cols-3">
                <div>
                    <h2 className="mb-4 text-lg font-bold">
                        Sobre o RPB Shopping
                    </h2>
                    <div>
                        <p>
                            Criado unicamente por Mário, o RPB Shopping é um
                            projeto para as disciplinas de Banco de Dados,
                            Algoritmos e Linguagem de Progamação e
                            Desenvolvimento de Aplicativos para o Centro
                            Profissional Dom Bosco com o objetivo de obtenção de
                            notas para para a AV2.
                        </p>
                        <p className="mt-4">
                            Essa é a terceira ideia sugerida para os trabalhos.
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="mb-4 text-lg font-bold">Nossa Missão</h2>
                    <div className="[&>p]:mb-4">
                        <p>
                            O RPB Shopping é um website de lista de compras que
                            visa auxiliar o usuário na hora de fazer as compras,
                            organizando a lista e sugerindo produtos com base no
                            conteúdo da despensa e histórico de compras.
                        </p>
                        <p>
                            Além disso, todas as listas e produtos estarão
                            sincronizadas com a conta do usuário conectado. Isso
                            significa que o usuário pode montar a lista no
                            computador, por exemplo e acessá-la através do
                            celular.
                        </p>
                        <p>
                            Prezamos sempre pelo conforto do usuário, então
                            existem diversos recursos que melhoram o uso. Um
                            exemplo é a alteração de temas. Se você ainda não
                            viu esse recurso, clique sobre sua foto de perfil no
                            topo da página!
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="mb-4 text-lg font-bold">Tecnologias</h2>
                    <div className="[&>*]:mb-4 [&>ul]:ml-4 [&>ul]:list-disc">
                        <p>
                            O sistema do RPB Shopping está dividido em duas
                            partes: Frontend (website) e Backend (API para
                            gerenciamento de dados).
                        </p>
                        <p>Tecnologias do frontend:</p>
                        <ul>
                            <li>TypeScript</li>
                            <li>ReactJS (Vite)</li>
                            <li>TailwindCSS</li>
                        </ul>
                        <p>Tecnologias do backend:</p>
                        <ul>
                            <li>TypeScript</li>
                            <li>NodeJS</li>
                            <li>ExpressJS</li>
                            <li>Prisma</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex flex-col items-center gap-2 border-t border-gray-500 pt-8 dark:border-slate-700">
                <span>
                    Copyright &copy; RPB Company {new Date().getFullYear()}
                </span>
                <span>RPB Shopping Versão 1.0.0</span>
            </div>
            <ul className="mt-8 flex items-center justify-center gap-4">
                <li>
                    <a
                        href="https://github.com/AABB2741/supermercado-banco-de-dados"
                        target="_blank"
                    >
                        <Github />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.linkedin.com/in/mário-santos-825a771b9/"
                        target="_blank"
                    >
                        <Linkedin />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.instagram.com/mariodsyb/"
                        target="_blank"
                    >
                        <Instagram />
                    </a>
                </li>
            </ul>
        </footer>
    );
}
