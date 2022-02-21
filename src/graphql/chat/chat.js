import { gql } from "@apollo/client";

export const CONVERSATION_BY_USER_ID = gql`
  query conversationsByUserId($userId: ID!) {
    conversationsByUserId(userId: $userId) {
        _id
        userId
        participantId
        name
        lastMessageId
        messages{
            _id
            text
            conversationId
            createdBy
            isRestaurant
            createdAt
        }
        participant{
            _id
            firstName
            lastName
            avatar
            location
            tags
        }
        perticipantResto{
          _id
          name
          avatar
          description
          location
          tags
        }
        user {
          _id
          firstName
          lastName
          avatar
          location
          tags
        }
        userResto{
          _id
          name
          avatar
          description
          location
          tags
        }
        isBlocked
        userIsRestaurant
        participantIsRestaurant
        createdAt
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($input: CreateMessageInput!) {
    sendMessage(input: $input) {
      _id
      text
      conversationId
      createdBy
      isRestaurant
      createdAt
    }
  }
`;

export const NOTIF_NEW_MESSAGE = gql`
  subscription newMessages($conversationId: ID!) {
    newMessages(conversationId: $conversationId){
      _id
      text
      conversationId
      createdBy
      isRestaurant
      createdAt
    }
  }
`;

export const DELETE_CONVERSATION = gql`
  mutation deleteConversation($_id: ID!) {
    deleteConversation(_id: $_id)
  }
`;

export const THERE_IS_CONVERSATION = gql`
  query thereIsConversation($input: IsConversationInput!) {
    thereIsConversation(input: $input) {
        _id
        userId
        participantId
        name
        lastMessageId
        messages{
            _id
            text
            conversationId
            createdBy
            isRestaurant
            createdAt
        }
        participant{
            _id
            firstName
            lastName
            avatar
            location
            tags
        }
        perticipantResto{
          _id
          name
          avatar
          description
          location
          tags
        }
        user {
          _id
          firstName
          lastName
          avatar
          location
          tags
        }
        userResto{
          _id
          name
          avatar
          description
          location
          tags
        }
        isBlocked
        userIsRestaurant
        participantIsRestaurant
        createdAt
    }
  }
`;

export const CONVERSATION_BY_ID = gql`
  query conversationById($_id: ID!) {
    conversationById(_id: $_id) {
        _id
        userId
        participantId
        name
        lastMessageId
        messages{
            _id
            text
            conversationId
            createdBy
            isRestaurant
            createdAt
        }
        participant{
            _id
            firstName
            lastName
            avatar
            location
            tags
        }
        perticipantResto{
          _id
          name
          avatar
          description
          location
          tags
        }
        user {
          _id
          firstName
          lastName
          avatar
          location
          tags
        }
        userResto{
          _id
          name
          avatar
          description
          location
          tags
        }
        isBlocked
        userIsRestaurant
        participantIsRestaurant
        createdAt
    }
  }
`;
