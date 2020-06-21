'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Subjects',[
        // PRIMERO
        {
            degree: 'GITST',
            subject: 'ALGE',
            name: 'Álgebra',
            course: 1,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'CALC',
            name: 'Cálculo',
            course: 1,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'FIS1',
            name: 'Física 1',
            course: 1,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'FTEL',
            name: 'Fundamentos de los Sistemas Telemáticos',
            course: 1,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'IACR',
            name: 'Introducción al Análisis de Circuitos',
            course: 1,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'INIT',
            name: 'Introducción a la Ingeniería de Telecomunicación',
            course: 1,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },


        {
            degree: 'GITST',
            subject: 'AVEC',
            name: 'Análisis Vectorial',
            course: 1,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },


        {
            degree: 'GITST',
            subject: 'FGST',
            name: 'Fundamentos de Gestión Empresarial',
            course: 1,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'FIS2',
            name: 'Física 2',
            course: 1,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'INEL',
            name: 'Introducción a la Electrónica',
            course: 1,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'MMAT',
            name: 'Métodos Matemáticos',
            course: 1,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'PRG',
            name: 'Programación',
            course: 1,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },


        // SEGUNDO 
        {
            degree: 'GITST',
            subject: 'EDIG',
            name: 'Electrónica Digital',
            course: 2,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'EINB',
            name: 'Electrónica e Instrumentación Básicas',
            course: 2,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'ELMG',
            name: 'Electromagnetismo',
            course: 2,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'IGL1',
            name: 'Inglés 1',
            course: 2,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'SALT',
            name: 'Señales Aleatorias',
            course: 2,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'SSIT',
            name: 'Señales y Sistemas',
            course: 2,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'ADCT',
            name: 'Análisis y Diseño de Circuitos',
            course: 2,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'ADSW',
            name: 'Análisis y Diseño de Software',
            course: 2,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'COTE',
            name: 'Campos y Ondas en Telecomunicación',
            course: 2,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'ELAN',
            name: 'Electrónica Analógica',
            course: 2,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'IGL2',
            name: 'Inglés 2',
            course: 2,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'RSTC',
            name: 'Redes y Servicios de Telecomunicación',
            course: 2,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'TECM',
            name: 'Teoría de la Comunicación',
            course: 2,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        // TERCERO
        {
            degree: 'GITST',
            subject: 'CELT',
            name: 'Circuitos Electrónicos',
            course: 3,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'RDOR',
            name: 'Redes de Ordenadores',
            course: 3,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'RDPR',
            name: 'Radiación y Propagación',
            course: 3,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'SDG1',
            name: 'Sistemas Digitales 1',
            course: 3,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'STRA',
            name: 'Sistemas de Transmisión',
            course: 3,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'TINF',
            name: 'Teoría de la Información',
            course: 3,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'TDSÑ',
            name: 'Tratamiento Digital de Señales',
            course: 3,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'COPT',
            name: 'Comunicaciones Ópticas',
            course: 3,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'CORE',
            name: 'Computación en Red',
            course: 3,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'ECOM',
            name: 'Electrónica de Comunicaciones',
            course: 3,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'ENRG',
            name: 'Sistemas de Energías',
            course: 3,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'ORGE',
            name: 'Organización de Empresas',
            course: 3,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            subject: 'SDG2',
            name: 'Sistemas Digitales 2',
            course: 3,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },


        // CUARTO
        // Sistemas de telecomunicación
        {
            degree: 'GITST',
            itinerary: 'sist',
            subject: 'ANTE',
            name: 'Antenas',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'sist',
            subject: 'MICR',
            name: 'Microondas',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'sist',
            subject: 'RCOM',
            name: 'Radiocomunicaciones',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'sist',
            subject: 'STEL',
            name: 'Sistemas de Telecomunicación',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'sist',
            subject: 'TRDG',
            name: 'Transmisión Digital',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'sist',
            subject: 'CMOV',
            name: 'Comunicaciones Móviles',
            course: 4,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'sist',
            subject: 'RDET',
            name: 'Sistemas de Radiodeterminación',
            course: 4,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'sist',
            subject: 'SURF',
            name: 'Subsistemas de Radiofrecuencia',
            course: 4,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        // Sistemas Electrónicos
        {
            degree: 'GITST',
            itinerary: 'elect',
            subject: 'ARQU',
            name: 'Arquitectura de Procesadores',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'elect',
            subject: 'DSED',
            name: 'Diseño de Sistemas Electrónicos Digitales',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'elect',
            subject: 'FEEL',
            name: 'Fabricación de Equipos Electrónicos',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'elect',
            subject: 'IELE',
            name: 'Instrumentación Electrónica',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'elect',
            subject: 'SEAM',
            name: 'Sistemas Electrónicos Analógicos y Mixtos',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'elect',
            subject: 'ELCO',
            name: 'Electrónica de Consumo',
            course: 4,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'elect',
            subject: 'ISEL',
            name: 'Ingeniería de Sistemas Electrónicos',
            course: 4,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'elect',
            subject: 'SECO',
            name: 'Sistemas Electrónicos de Control',
            course: 4,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'elect',
            subject: 'SCON',
            name: 'Sistemas para conectividad',
            course: 4,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        // Sistemas Telemáticos
        {
            degree: 'GITST',
            itinerary: 'telem',
            subject: 'CDPS',
            name: 'Centros de Datos y Provisión de Servicios',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'telem',
            subject: 'IWEB',
            name: 'Ingeniería Web',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'telem',
            subject: 'RECO',
            name: 'Redes Coroporativas',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'telem',
            subject: 'RCMO',
            name: 'Redes de Comunicaciones Móviles',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'telem',
            subject: 'SEGU',
            name: 'Seguridad en Sistemas y Redes de Telecomunicación',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'telem',
            subject: 'DORE',
            name: 'Dimensionado y Operación de Redes',
            course: 4,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'telem',
            subject: 'ISST',
            name: 'Ingeniería de Sistemas y Servicios Telemáticos',
            course: 4,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'telem',
            subject: 'RSRD',
            name: 'Redes y Servicios Radio',
            course: 4,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Sistemas Audiovisuales
        {
            degree: 'GITST',
            itinerary: 'auvis',
            subject: 'EQSA',
            name: 'Equipos y Sistemas Audiovisuales',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'auvis',
            subject: 'TDIV',
            name: 'Tratamiento Digital de Imágenes y Video',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'auvis',
            subject: 'TDVA',
            name: 'Tratamiento Digital de Voz y Audio',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'auvis',
            subject: 'TV',
            name: 'Televisión',
            course: 4,
            semester: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'auvis',
            subject: 'CMAV',
            name: 'Comunicaciones Audiovisuales',
            course: 4,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'auvis',
            subject: 'DSRE',
            name: 'Difusión y Servicios de Red',
            course: 4,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            degree: 'GITST',
            itinerary: 'auvis',
            subject: 'PROD',
            name: 'Producción Multimedia',
            course: 4,
            semester: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Subjects', null, {});
  }
};