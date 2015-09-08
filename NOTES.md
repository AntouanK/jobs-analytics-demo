
### GraphQL example queries

#### see all types

```
query IntrospectionTypeQuery {
    __schema {
        types {
            name
            description
        }
    }
}
```

#### see fields of a type

```
query FieldsQuery {
    __type (name: "CountryStats"){
        fields
        {
            name
            description
        }
    }
}
```
