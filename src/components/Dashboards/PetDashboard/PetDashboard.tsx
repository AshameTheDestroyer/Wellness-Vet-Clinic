import { Link } from "react-router-dom";

import Slider from "../../Slider/Slider";
import CRUDDropDown from "../../CRUDDropDown/CRUDDropDown";
import { Service, TEMPORARY_SERVICE_DATA } from "../../../pages/AboutPage/AboutPage";

import "./PetDashboard.scss";

import cat_image from "../../../assets/images/wallpapers/cat2.png";
import rabbit_image from "../../../assets/images/wallpapers/rabbit2.png";

type PetWithImageAndServices = Pet & {
    imageSource: string;
    imageAlternative: string;
    usedServices: Array<Service>;
};

const TEMPORARY_PET_DATA: Array<PetWithImageAndServices> =
    new Array(40).fill(null).map((_datum, i) =>
        [(Math.random() > 0.5) ? {
            type: "Cat",
            name: "Kitten",
            imageSource: cat_image,
            imageAlternative: "A cat standing on a couch.",
        } : {
            type: "Rabbit",
            name: "Bunbun",
            imageSource: rabbit_image,
            imageAlternative: "A rabbit in plain fields.",
        }].map(semiDatum => ({
            ...semiDatum,
            id: i + 1,
            userId: ~~(Math.random() * 4) + 1,
            age: ~~(Math.random() * 6) + 1,
            gender: (Math.random() > 0.5) ? "male" : "female",
            usedServices: TEMPORARY_SERVICE_DATA.filter(_datum => Math.random() > 0.5),
        }))[0] as PetWithImageAndServices
    );

type PetDashboardProps = {
    user?: User;
};

export default function PetDashboard(props: PetDashboardProps): React.ReactElement {
    const PET_DATA: Array<PetWithImageAndServices> = (props.user == null) ?
        TEMPORARY_PET_DATA : TEMPORARY_PET_DATA.filter(pet => pet.userId == props.user.id);

    return (
        <main id="pet-dashboard">
            <h2>{(props.user != null) ? "My Pets" : "Pets"}</h2>

            {
                PET_DATA.map(pet =>
                    <div key={pet.id} className="card pet-card">
                        <figure>
                            <img src={pet.imageSource} alt={pet.imageAlternative} />
                        </figure>
                        <main>
                            <h3>{pet.name}</h3>
                            <p>Type: {pet.type}</p>
                            <p>Age: {pet.age}</p>
                            <p data-gender={pet.gender}>Gender: </p>
                        </main>
                        <section>
                            <h4>Used Services:</h4>
                            {
                                (pet.usedServices.length > 0) ?
                                    <Slider> {
                                        pet.usedServices.map(service =>
                                            <Link
                                                key={service.id}
                                                to={`/About/?service-id=${service.id}`}
                                                children={service.title}
                                            />
                                        )
                                    } </Slider> :
                                    <p>No services are used for this pet yet.</p>
                            }
                        </section>
                        <CRUDDropDown />
                    </div>
                )
            }
        </main>
    );
}