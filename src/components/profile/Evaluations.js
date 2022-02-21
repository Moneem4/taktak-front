import React from "react";
import PropTypes from "prop-types";
import EvaluationItem from "./evaluationUtils/EvaluationItem";

function Evaluations(props) {
  const evaluations = [
    {
      user: { userName: "Helmi", profileImage: 'https://picsum.photos/400' },
      evaluated: {

        name: "restaurant Name",
        rate: 3,
        createdAt: "987987987",
        commentaire: "3jibni barch mekla bnina mais service peut mieux faire ",
        likesNumber: "323",
        commentsNumber: "23",
        comments: [
          {
            commentHandler: {
              firstName: "so7leb",
              profileImage: "https://picsum.photos/400",
            },
            content: "commentaire so7leb on evaluation",
          },
          {
            commentHandler: {
              firstName: "ma9arouna",
              profileImage: "https://picsum.photos/400",
            },
            content: "ma9arouna commentaire on evaluation",
          },
          {
            commentHandler: {
              firstName: "mar9A",
              profileImage: "https://picsum.photos/400",
            },
            content: "commentaire mar9a on evaluation",
          },
        ],
      },
    },
    {
      user: { userName: "Helmi", profileImage: 'https://picsum.photos/400' },
      evaluated: {

        name: "restaurant Name",
        rate: 3,
        createdAt: "987987987",
        commentaire: "3jibni barch mekla bnina mais service peut mieux faire ",
        likesNumber: "323",
        commentsNumber: "23",
        comments: [
          {
            commentHandler: {
              firstName: "so7leb",
              profileImage: "https://picsum.photos/400",
            },
            content: "commentaire so7leb on evaluation",
          },
          {
            commentHandler: {
              firstName: "ma9arouna",
              profileImage: "https://picsum.photos/400",
            },
            content: "ma9arouna commentaire on evaluation",
          },
          {
            commentHandler: {
              firstName: "mar9A",
              profileImage: "https://picsum.photos/400",
            },
            content: "commentaire mar9a on evaluation",
          },
        ],
      },
    }, {
      user: { userName: "Helmi", profileImage: 'https://picsum.photos/400' },
      evaluated: {

        name: "restaurant Name",
        rate: 3,
        createdAt: "987987987",
        commentaire: "3jibni barch mekla bnina mais service peut mieux faire ",
        likesNumber: "323",
        commentsNumber: "23",
        comments: [
          {
            commentHandler: {
              firstName: "so7leb",
              profileImage: "https://picsum.photos/400",
            },
            content: "commentaire so7leb on evaluation",
          },
          {
            commentHandler: {
              firstName: "ma9arouna",
              profileImage: "https://picsum.photos/400",
            },
            content: "ma9arouna commentaire on evaluation",
          },
          {
            commentHandler: {
              firstName: "mar9A",
              profileImage: "https://picsum.photos/400",
            },
            content: "commentaire mar9a on evaluation",
          },
        ],
      },
    },
  ];
  let tab = evaluations.map(el=><EvaluationItem evaluation={el}/>)
  return (
    <div className="tabs-panel is-active" id="panel4">
      <div className="evaluation">
        <div className="evaluation-header">
          <span className="evaluation-label">
            Avis <strong>14555</strong>{" "}
          </span>
          <span className="evaluation-options">
            Les plus récents
            <i className="fal fa-sort-down" aria-hidden="true" />
          </span>
        </div>
      </div>
      {tab}
  
    </div>
  );
}

Evaluations.propTypes = {};

export default Evaluations;
