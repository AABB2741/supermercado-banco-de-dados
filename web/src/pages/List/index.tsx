import { useEffect } from "react";
import { CheckCheck } from "lucide-react";

import { Banner } from "./Banner";
import { Filter } from "../../components/Filter";

import { useList } from "../../contexts/ListProvider";

export function List() {
    const { list } = useList();

    useEffect(() => {
        if (!list?.name) return;

        document.title = `${list.name} - RPB Shopping`;
    }, [list?.name]);

    return (
        <div>
            <Banner />
            <section className="p-8">
                <Filter
                    title="Filtrar produtos"
                    value="all"
                    options={[
                        {
                            icon: CheckCheck,
                            label: "Tudo",
                            value: "all",
                        },
                    ]}
                />
            </section>
        </div>
    );
}
