export const mockQuery = jest.fn();
export const mockConnect = jest.fn();
export const mockEnd = jest.fn();
export const mockOn = jest.fn();

export const Pool = jest.fn().mockImplementation(() => ({
    query: mockQuery,
    connect: mockConnect,
    on: mockOn,
    end: mockEnd
}));