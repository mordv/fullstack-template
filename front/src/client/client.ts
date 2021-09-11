interface ClientType {
  getStatus(): Promise<void>;
}

export const Client: ClientType = {
  getStatus: () => fetch(`/status`).then(),
};
