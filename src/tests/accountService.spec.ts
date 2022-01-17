
describe('AccountServices', () => {
    test('Checks if the return is an object', async () => {
        const list = [{}]
        expect(list).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                })
            ])
        )
    })
})
