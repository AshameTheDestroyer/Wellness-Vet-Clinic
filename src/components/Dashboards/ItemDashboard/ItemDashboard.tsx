import React from "react";

import CRUDDropDown from "../../CRUDDropDown/CRUDDropDown";
import ReadMoreText from "../../../utils/components/ReadMoreText/ReadMoreText";

import "./ItemDashboard.scss";

import dog_image1 from "../../../assets/images/wallpapers/dog1.png";
import dog_image2 from "../../../assets/images/wallpapers/dog2.png";
import dog_image3 from "../../../assets/images/wallpapers/dog3.png";

type ItemWithImage = Item & {
    imageSource: string;
    imageAlternative: string;
};

const TEMPORARY_ITEM_DATA: Array<ItemWithImage> = new Array(33).fill(null).map((_datum, i) => ({
    id: i + 1,
    category: "dog",
    name: `Item ${i + 1}`,
    imageAlternative: "A dog sitting.",
    imageSource: [dog_image1, dog_image2, dog_image3][~~(Math.random() * 3)],
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, expedita modi? Libero, labore omnis unde officia nesciunt perferendis iusto voluptatem. Nulla laborum eaque iusto consequuntur doloribus, facilis illo odit deleniti!",
}));

export default function ItemDashboard(): React.ReactElement {
    return (
        <main id="item-dashboard">
            <h2>Items</h2>
            {
                TEMPORARY_ITEM_DATA.map(item =>
                    <div key={item.id} className="card item-card">
                        <figure>
                            <img src={item.imageSource} alt={item.imageAlternative} />
                        </figure>
                        <main>
                            <h3>{item.name}</h3>
                            <p>Category: {item.category}</p>
                        </main>
                        <ReadMoreText
                            lineCount={3}
                            text={item.description}
                        />
                        <CRUDDropDown />
                    </div>
                )
            }
        </main>
    );
}