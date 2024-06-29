import { SORT_ORDER } from "../constants/contacts-constants.js";

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfContact = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'contactType',
    'isFavourite',
    'createdAt',
    'updatedAt',
  ];

  if (keysOfContact.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};

// import { SORT_ORDER } from "../constants/contacts-constants.js";

// const parseSortParams = ({ sortOrder, sortBy }, fieldList) => {
//     const parsedSortOrder = SORT_ORDER.includes(sortOrder) ? sortOrder : SORT_ORDER[0];
//     const parsedSortBy = fieldList.includes(sortBy) ? sortBy : fieldList[0];

//     return {
//         sortBy: parsedSortBy,
//         sortOrder: parsedSortOrder,
//     }
// }

// export default parseSortParams;

