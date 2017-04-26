export default (model: any, storedTime: string): any => {
  return {
    ...model,

    // Generates missing properties where required.
    timestamp: (
      model.timestamp === undefined ?
      storedTime :
      model.timestamp
    ),

    // Adds LRS properties.
    stored: storedTime,
  };
};
