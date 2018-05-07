/* eslint global-require: 0 */

import { fromJS } from 'immutable';

export default fromJS([
    // The "getting started" schema provides table-of-contents links
    // for the sections in src/client/introduction.js.  You are free
    // to customize or remove both the schema and the introduction component.
    // require('./getting-started.json'),
    require('../schemas/person.json'),
    require('../schemas/organization.json'),
    require('../schemas/article.json')
]);