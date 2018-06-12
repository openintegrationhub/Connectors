// /* eslint-disable arrow-body-style */
//
// const expect = require('chai').expect;
// const transform = require('../lib/actions/transform');
// const eioUtils = require('elasticio-node').messages;
//
// describe('Transformation test', () => {
//   it('should handle simple transforms', () => {
//     return transform.process(eioUtils.newMessageWithBody({
//       first: 'Renat',
//       last: 'Zubairov'
//     }), {
//       expression: `{ "fullName": first & " " & last }`
//     }).then(result => {
//       expect(result.body).to.deep.equal({
//         fullName: 'Renat Zubairov'
//       });
//     });
//   });
//
//   it('should not produce an empty message if transformation returns undefined', () => {
//     return transform.process(eioUtils.newMessageWithBody({
//       first: 'Renat',
//       last: 'Zubairov'
//     }), {
//       expression: `$[foo=2].({ "foo": boom })`
//     }).then(result => {
//       expect(result).to.be.an('undefined');
//     });
//   });
//
//   it('should handle passthough properly', () => {
//     const msg = eioUtils.newMessageWithBody({
//       first: 'Renat',
//       last: 'Zubairov'
//     });
//     msg.passthrough = {
//       ps: 'psworks'
//     };
//     return transform.process(msg, {
//       expression: `{ "fullName": first & " " & elasticio.ps}`
//     }).then(result => {
//       expect(result.body).to.deep.equal({
//         fullName: 'Renat psworks'
//       });
//     });
//   });
// });
