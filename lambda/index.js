const Alexa = require('ask-sdk-core');
var http = require('http'); 

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Olá Brian, gostaria de consultar as atividades em andamento. pendentes. finalizadas. a projeção do dia e do mês ou o dash de escalonadas?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const ConsultaAndamentoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConsultaAndamentoIntent';
    },
    async handle(handlerInput) {
      let outputSpeech = 'Houve falha na conexão.';
  
      await getRemoteData('http://177.55.114.52/dash/Alexa/macro/tarefas_macro_and.php')
        .then((response) => {
          const data = JSON.parse(response);
     outputSpeech = ` ${data[0].prazo} tarefas estão no prazo e ${data[0].atrasada} atrasadas. `;
    })
        .catch((err) => {
          console.log(`ERROR: ${err.message}`);
          // set an optional error message here
          // outputSpeech = err.message;
        });
  
      return handlerInput.responseBuilder
        .speak(outputSpeech)
        .reprompt('Posso ajudar em mais alguma coisa?')
        .getResponse();
    },
  };

  
const ConsultaPendentesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConsultaPendentesIntent';
    },
    async handle(handlerInput) {
      let outputSpeech = 'Houve falha na conexão.';
  
      await getRemoteData('http://177.55.114.52/dash/Alexa/macro/tarefas_macro_pen.php')
        .then((response) => {
          const data = JSON.parse(response);
         outputSpeech = `Existem ${data[0].escalonada} tarefas escalonadas, ${data[0].vencida} vencidas, ${data[0].alerta} em alerta e ${data[0].aberta} abertas`;
    })
        .catch((err) => {
          console.log(`ERROR: ${err.message}`);
          // set an optional error message here
          // outputSpeech = err.message;
        });
  
      return handlerInput.responseBuilder
        .speak(outputSpeech)
        .reprompt('Posso ajudar em mais alguma coisa?')
        .getResponse();
    },
  };

  
const ConsultaFinalizadasIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConsultaFinalizadasIntent';
    },
    async handle(handlerInput) {
      const intentName = handlerInput.requestEnvelope.request.intent.slots.param_time.resolutions.resolutionsPerAuthority[0].values[0].value.id; 
      let outputSpeech =  `Houve falha na conexão`;
      await getRemoteData('http://177.55.114.52/dash/Alexa/macro/tarefas_macro_fin.php?time=' + intentName) 
        .then((response) => {
          const data = JSON.parse(response);
     outputSpeech = `Foram executadas ${data[0].prazo} tarefas no prazo e ${data[0].atrasadas} atrasadas. `;
    })
        .catch((err) => {
          console.log(`ERROR: ${err.message}`);
          // set an optional error message here
          // outputSpeech = err.message;
        });
  
      return handlerInput.responseBuilder
        .speak(outputSpeech)
        .reprompt('Posso ajudar em mais alguma coisa?')
        .getResponse();
    },
  };

  
  const ConsultaEscalonamentoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConsultaEscalonamentoIntent';
    },
    async handle(handlerInput) {
      let outputSpeech = 'No nível diretoria executiva. ';
  
      await getRemoteData('http://177.55.114.52/dash/Alexa/macro/alexa_escalonamento.php')
        .then((response) => {
          const data = JSON.parse(response);
         // $const = ${data.length};
            for(var i=0; i< data.length ; i++)
          {
           outputSpeech =  outputSpeech.concat(` Na hierarquia de  ${data[i].responsavel} possui ${data[i].number} tarefas escalonadas. `);
          }

        })
        .catch((err) => {
          console.log(`ERROR: ${err.message}`);
          // set an optional error message here
          // outputSpeech = err.message;
        });
  
      return handlerInput.responseBuilder
        .speak(outputSpeech)
        .reprompt('Posso ajudar em mais alguma coisa?')
        .getResponse();
    },
  };
  const ConsultaProjecaoLDIntentHandler  = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConsultaProjecaoLDIntent';
    },
    async handle(handlerInput) {
      let outputSpeech = 'A conexãoo falhou.';
  
      await getRemoteData('http://177.55.114.52/dash/Alexa/macro/projecao.php')
        .then((response) => {
          const data = JSON.parse(response);
     outputSpeech = `Nas últimas 24 horas foram executadas ${data[0].l24} tarefas e nas 24 horas que antecederam  ${data[0].l48}.
     `;
    })
        .catch((err) => {
          console.log(`ERROR: ${err.message}`);
          // set an optional error message here
          // outputSpeech = err.message;
        });
  
      return handlerInput.responseBuilder
        .speak(outputSpeech)
        .reprompt('Posso ajudar em algo mais?')
        .getResponse();
    },
  };

  const ConsultaProjecaoMesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConsultaProjecaoMesIntent';
    },
    async handle(handlerInput) {
      let outputSpeech = 'A conexãoo falhou';
  
      await getRemoteData('http://177.55.114.52/dash/Alexa/macro/projecao_mes.php')
        .then((response) => {
          const data = JSON.parse(response);
         // $const = ${data.length};
          var val = ((data[0].CM  * 100/ data[0].LMCD) -100).toFixed(0) ;
           outputSpeech = `No mês atual foram realizadas ${data[0].CM} tarefas, no mesmo período do mês passado foram feitas  ${data[0].LMCD}. Em comparação com o mês passado o desempenho foi de aproximadamente ${val} porcento`;
          

        })
        .catch((err) => {
          console.log(`ERROR: ${err.message}`);
          // set an optional error message here
          // outputSpeech = err.message;
        });
  
      return handlerInput.responseBuilder
        .speak(outputSpeech)
        .reprompt('Posso ajudar em mais alguma coisa?')
        .getResponse();
    },
  };
  

  const ConsultaProjecaoDiaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConsultaProjecaoDiaIntent';
    },
    async handle(handlerInput) {
      let outputSpeech = 'houve falha na conexão';
  
      await getRemoteData('http://177.55.114.52/dash/Alexa/macro/projecao_dia.php')
        .then((response) => {
          const data = JSON.parse(response);
         // $const = ${data.length};
          
           outputSpeech =  `No dia anterior foram realizadas  ${data[0].LD} tarefas,  hoje, até o momento ${data[0].LDCT}, e estão planejadas para serem realizadas hoje mais ${data[0].CD} tarefas.`;
          

        })
        .catch((err) => {
          console.log(`ERROR: ${err.message}`);
          // set an optional error message here
          // outputSpeech = err.message;
        });
  
      return handlerInput.responseBuilder
        .speak(outputSpeech)
        .reprompt('Posso ajudar em mais alguma coisa?')
        .getResponse();
    },
  };
  
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Você pode saber a quantidade de tarefas em andamento dizendo ANDAMENTO, as atividades pendentes dizendo Pendente. as concluídas dizendo finalizadas. A projeção do dia, a projeção do mês, Ou consultar o dashboard de escalonamento dizendo Escalonadas';

        return handlerInput.responseBuilder
            .speak(speakOutput)
             .reprompt('O que deseja saber?')
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Até logo!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Você ativou o  ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Desculpe, houve um erro na conexão, tente novamente.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const getRemoteData = (url) => new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? require('https') : require('http');
    const request = client.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error(`Failed with status code: ${response.statusCode}`));
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err));
  });

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ConsultaAndamentoIntentHandler,
        ConsultaPendentesIntentHandler,
        ConsultaFinalizadasIntentHandler,
        ConsultaEscalonamentoIntentHandler,
        ConsultaProjecaoMesIntentHandler,
        ConsultaProjecaoDiaIntentHandler,
        ConsultaProjecaoLDIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
