import * as superagent from 'superagent';
import * as chai from 'chai';

declare module 'chai-http' {
  export function request(app: superagent.SuperAgent<superagent.SuperAgentRequest>): chai.Request;
}