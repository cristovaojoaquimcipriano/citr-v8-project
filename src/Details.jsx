import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import fetchPet from "./api/fetchPet";
import Carouserl from "./components/Carousel";
import Modal from "./components/modals/Modal";
import ErrorBoundary from "./erros/ErrorBoundary";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">@</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carouserl images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} — {pet.breed} — {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button onClick={() => setShowModal(false)}>Yes</button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
