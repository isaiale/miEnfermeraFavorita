import { Selector } from 'testcafe';

fixture `My Integration Test`
    .page `http://localhost:5173`
    .skipJsErrors(true);

test('Comprobar que el título de la página es correcto', async t => {
    const pageTitle = await Selector('title').innerText;
    await t
        .expect(pageTitle).eql('Mi Enfermera Favorita');
});


test("Debe cargar la página en menos de 2 segundos", async (t) => {
    const startTime = Date.now();
    await t.navigateTo("http://localhost:5173");
    const endTime = Date.now();
    
    await t.expect(endTime - startTime).lte(2000);
  });


