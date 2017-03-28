export default (service: any): void => {
  afterEach(() =>
    service.removeAllModels()
  );
};
