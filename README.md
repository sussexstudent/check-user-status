# check-user-status
Automate debugging user login problems via MSL Admin

`$ node src/index.js user@domain.ac.uk`

```
{ cardId: '7923793',
  status:
   { cardInUniData: true,
     firstTime: true,
     lastTime: true,
     linkedToPerson: true,
     clearedImport: true,
     clearedDuplicates: true,
     clearedBlockedList: true } }
```
