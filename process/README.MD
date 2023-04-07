# Process actions.json

Process to get the actions from https://awspolicygen.s3.amazonaws.com/policygen.html AWS tool in the https://awspolicygen.s3.amazonaws.com/js/policies.js where all the policies and actions are available.
With this code we want to separate List, read and write permissions by the action name
Actions JS contains all the actions formated as [ {actions: [] , prefix: string}] just run in the browser:

```Javascript
JSON.stringify(
   Object.values(app.PolicyEditorConfig.serviceMap).map((ac) => ({
    actions: ac.Actions,
     prefix: ac.StringPrefix,
   }))
);
```
