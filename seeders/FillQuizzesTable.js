'use strict';

module.exports = {
    up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Quizzes', [
        //TEST RDPR NOVIEMBRE 2018
        {
            testid: 'RDPR-11-2018-1',
            subject: 'RDPR',
            question: 'Una antena genera una densidad de potencia	de -30 dB(mW/m2) en	la dirección de	máxima radiación a una distancia de 1km. El	campo	eléctrico	generado a dicha distancia cuando se radia por un	lóbulo secundario	de -20 dB	con	respecto al	principal	es:',
            answer: 4,
            answer1: '5,7 dB(V/m)',
            answer2: '22,8 dB(V/m)',
            answer3: '-7,1 dB(V/m)',
            answer4: '-51.2 dB(V/m)',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {   
            testid: 'RDPR-11-2018-1',
            subject: 'RDPR',
            question: 'El rendimiento de	radiación	de	una	antena, cuyo	diagrama	de	radiación	se	ha	medido a	una	distancia	mayor	a	2D²/λ, se	puede	obtener	a	partir	de:',
            answer: 2,
            answer1: 'El área	total	de	la	antena	y	las	pérdidas	de	espacio	libre',
            answer2: 'La densidad	de	potencia	radiada	medida,	la	distancia	de	medida, la	potencia	entregada	a	la	antena y	la	directividad	de	la	antena',
            answer3: 'La relación	de	la	densidad	de	potencia	 transmitida	 y	su	 relación	con la	distancia	de	medida',
            answer4: 'La parte	imaginaria	de	la	densidad	de	potencia medida',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            testid: 'RDPR-11-2018-1',
            subject: 'RDPR',
            question: 'En	condiciones	de	campo	lejano,	siendo la	distancia	de	medida r:',
            answer: 3,
            answer1: 'No	se	pueden	medir	los	nulos	del	diagrama	de	radiación	y	el	error	de	fase	cometido	es	despreciable',
            answer2: 'Se	miden	los	términos	de	potencia	reactiva	de	la	ecuación	del	campo	eléctrico	obtenido	a	partir	del	potencial	vector	magnético	retrasado	A',
            answer3: 'El	diámetro	de	una	antena	de	apertura	circular	debe	ser	menor	que	\\(\\sqrt{\\frac{rλ}{2}} \\)',
            answer4: 'Los	 campos	 eléctrico	 y	magnético	 radiados	 por	la	 antena	 poseen	 componente	 en	la	dirección	de	propagación',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            testid: 'RDPR-11-2018-1',
            subject: 'RDPR',
            question: 'La	fórmula de	Friis:',
            answer: 4,
            answer1: 'Relaciona	exclusivamente	las	pérdidas	de	espacio	libre	con	la	polarización	con	la	que	trabajan	las	antenas	de	un	enlace',
            answer2: 'Relaciona	la	potencia	recibida	con	la	directividad	de	la	antena	transmisora',
            answer3: 'Define	la	potencia	entregada	por	el	transmisor	a	partir	del	coeficiente	de	reflexión	de	la	antena	en	recepción',
            answer4: 'Relaciona	la	potencia	entregada	por	una	antena	al	receptor	con	la	potencia	disponible	en	el	 transmisor,	las	pérdidas	de	espacio	libre,	la	orientación	',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            testid: 'RDPR-11-2018-1',
            subject: 'RDPR',
            question: 'Una	antena	omnidireccional:',
            answer: 3,
            answer1: 'Tiene	siempre	una	pureza	de	polarización	circular	igual	a	1	dB',
            answer2: 'Radia	una	intensidad	de	potencia	constante	para	todas	las	direcciones	de	(θ,φ)',
            answer3: 'Radia	un	campo	eléctrico	constante	en	todas	las	direcciones	contenidas	en	un	plano',
            answer4: 'Ninguna	de	las	anteriores',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            testid: 'RDPR-11-2018-1',
            subject: 'RDPR',
            question: 'En	 el	 vacío,	 una	 antena	 radia	 un	 campo	 eléctrico	 de	 4.5	 dB(V/m),	 que	 equivale	 a	 una	densidad	de	potencia	de:',
            answer: 3,
            answer1: '9,7 mW/m2,',
            answer2: '30,5 mW/m2',
            answer3: '3,7 mW/m2',
            answer4: '5,5	mW/m2',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            testid: 'RDPR-11-2018-1',
            subject: 'RDPR',
            question: 'Cuál	de las	siguientes	afirmaciones	es	cierta:',
            answer: 4,
            answer1: 'La	 directividad se	 puede	 medir	 a	 partir	 del	 ancho	 de	 haz	 a	-2,25	 dB	 en	 los	 planos	principales	sin	importar	el	tipo	de	antena',
            answer2: 'Si	la	relación	axial	es	igual	a	infinito, la	antena	radia	con	polarización	circular',
            answer3: 'La	 potencia	 transmitida	 de	 una	 antena	 será	 siempre	 la	 potencia	 entregada	 por	 el	generador	 sin	 importar	 el	 valor	 de	 la	 impedancia	 de	 la	 antena	 según	 circuito	 de	Thevenin	en	transmisión',
            answer4: 'La	ganancia	de	la	antena	es	menor	o	igual	que	la	directividad	de	la	antena',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            testid: 'RDPR-11-2018-1',
            subject: 'RDPR',
            question: 'Diga	cuál	de	las	siguientes	afirmaciones	es	cierta,	si	se	tiene	un	campo	eléctrico	radiado	por	una	antena	en	campo	lejano	igual	a \\(\\vec{E}_{(\\vec{r},t)} = \\frac{E_0}{r} \\cdot e^{-jk_0r} \\cdot e^{jw_0t} \\cdot (a\\hat{\\varphi} + jb\\hat{\\theta}) \\):',
            answer: 2,
            answer1: 'El	campo	eléctrico	estará linealmente polarizado	si	b<a',
            answer2: 'El	campo	eléctrico	tendrá	polarización	circular	si	a es	igual	a	b',
            answer3: 'El	campo	eléctrico	tendrá	polarización	circular	para	cualquier	valor	de	b',
            answer4: 'Si a es	 siempre	 negativo,	 entonces	 la	 polarización	 del	 campo	 es	 siempre	 circular	 a	derechas',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            testid: 'RDPR-11-2018-1',
            subject: 'RDPR',
            question: 'Se	reciben	dos	señales	de	la	misma	densidad	de	potencia,	una	procedente	de	una	antena	con	 polarización	 vertical	 pura	 (señal	 deseada)	 y	 otra	 procedente	 de	 una	 antena	 con	polarización	horizontal',
            answer: 3,
            answer1: 'La	relación	señal a interferencia	será	de 15	dB',
            answer2: 'La	relación	señal a interferencia	será	de 35	dB',
            answer3: 'La	relación	señal a interferencia	será	de 55	dB',
            answer4: 'Depende	de	la	ganancia	de	la	antena	receptora',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            testid: 'RDPR-11-2018-1',
            subject: 'RDPR',
            question: 'Cuál de los siguientes	campos tiene polarización lineal',
            answer: 3,
            answer1: '\\(\\vec{E}_{(\\vec{r},t)} = \\frac{E_0}{r} \\cdot e^{-jk_0r} \\cdot e^{jw_0t} \\cdot (a\\hat{\\varphi} + jb\\hat{\\theta}) \\)',
            answer2: '\\(\\vec{E}_{(\\vec{r},t)} = \\frac{E_0}{z} (0.25\\hat{x} + j0.25\\hat{y}) \\cdot e^{j(w_0t-k_0z)} \\)',
            answer3: '\\(\\vec{E}_{(\\vec{r},t)} = \\frac{E_0}{z} (\\hat{x} + 0.25\\hat{y}) \\cdot e^{j(w_0t-k_0z)} \\)',
            answer4: 'Ninguna	de	las	anteriores',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Quizzes', null, {});
    }
};
