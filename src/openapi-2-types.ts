export type OpenAPISpec = {
    swagger:             string;
    info:                Info;
    host:                string;
    basePath:            string;
    tags:                Tag[];
    schemes:             string[];
    paths:               Paths;
    securityDefinitions: SecurityDefinitions;
    definitions:         Definitions;
    externalDocs:        ExternalDocs;
}

export type Definitions = {
    ApiResponse: APIResponse;
    Category:    CategoryClass;
    Pet:         Pet;
    Tag:         CategoryClass;
    Order:       Order;
    User:        User;
}

export type APIResponse = {
    type:       string;
    properties: APIResponseProperties;
}

export type APIResponseProperties = {
    code:    Code;
    type:    Message;
    message: Message;
}

export type Code = {
    type:   CodeType;
    format: Format;
}

export enum Format {
    DateTime = "date-time",
    Int32 = "int32",
    Int64 = "int64",
}

export enum CodeType {
    File = "file",
    Integer = "integer",
    String = "string",
}

export type Message = {
    type: MessageType;
}

export enum MessageType {
    Boolean = "boolean",
    String = "string",
}

export type CategoryClass = {
    type:       string;
    properties: CategoryProperties;
    xml:        CategoryXML;
}

export type CategoryProperties = {
    id:   Code;
    name: Message;
}

export type CategoryXML = {
    name: string;
}

export type Order = {
    type:       string;
    properties: OrderProperties;
    xml:        CategoryXML;
}

export type OrderProperties = {
    id:       Code;
    petId:    Code;
    quantity: Code;
    shipDate: Code;
    status:   Status;
    complete: Message;
}

export type Status = {
    type:        CodeType;
    description: string;
    enum:        string[];
}

export type Pet = {
    type:       string;
    required:   string[];
    properties: PetProperties;
    xml:        CategoryXML;
}

export type PetProperties = {
    id:        Code;
    category:  SchemaClass;
    name:      Name;
    photoUrls: PhotoUrls;
    tags:      Tags;
    status:    Status;
}

export type SchemaClass = {
    $ref: string;
}

export type Name = {
    type:    CodeType;
    example: string;
}

export type PhotoUrls = {
    type:  string;
    xml:   PhotoUrlsXML;
    items: PhotoUrlsItems;
}

export type PhotoUrlsItems = {
    type: CodeType;
    xml:  CategoryXML;
}

export type PhotoUrlsXML = {
    wrapped: boolean;
}

export type Tags = {
    type:  string;
    xml:   PhotoUrlsXML;
    items: TagsItems;
}

export type TagsItems = {
    xml:  CategoryXML;
    $ref: string;
}

export type User = {
    type:       string;
    properties: UserProperties;
    xml:        CategoryXML;
}

export type UserProperties = {
    id:         Code;
    username:   Message;
    firstName:  Message;
    lastName:   Message;
    email:      Message;
    password:   Message;
    phone:      Message;
    userStatus: UserStatus;
}

export type UserStatus = {
    type:        CodeType;
    format:      Format;
    description: string;
}

export type ExternalDocs = {
    description: string;
    url:         string;
}

export type Info = {
    description:    string;
    version:        string;
    title:          string;
    termsOfService: string;
    contact:        Contact;
    license:        License;
}

export type Contact = {
    email: string;
}

export type License = {
    name: string;
    url:  string;
}

export type Parameter = {
    in:          string;
    name:        string;
    description: string;
    required:    boolean;
    type:       CodeType;
}

export type Response = {
    [status: number]: {
        description: string
    }
}

export type EndPoint = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    consumes:    string[];
    produces:    string[];
    parameters:  Parameter[];
    responses:   Response;
    security:    PostSecurity[];
}

// There are more HTTP methods, but these are the main ones.
export type Method =
    'get' |
    'put' |
    'post' |
    'patch' |
    'delete';

export type Path = {
    [method in Method]: EndPoint
}

export type Paths = {
    [path: string]: Path
}

export type PetClass = {
    post: PetPost;
    put:  PetPut;
}

export type PetPost = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    consumes:    string[];
    produces:    string[];
    parameters:  PutParameter[];
    responses:   PurpleResponses;
    security:    PostSecurity[];
}

export type PutParameter = {
    in:          string;
    name:        string;
    description: string;
    required:    boolean;
    schema?:     SchemaClass;
    type?:       CodeType;
}

export type PurpleResponses = {
    "405": The405;
}

export type The405 = {
    description: string;
}

export type PostSecurity = {
    petstore_auth: PetstoreAuthElement[];
}

export enum PetstoreAuthElement {
    ReadPets = "read:pets",
    WritePets = "write:pets",
}

export type PetPut = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    consumes:    string[];
    produces:    string[];
    parameters:  PutParameter[];
    responses:   { [key: string]: The405 };
    security:    PostSecurity[];
}

export type PetFindByStatus = {
    get: PetFindByStatusGet;
}

export type PetFindByStatusGet = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    produces:    string[];
    parameters:  PurpleParameter[];
    responses:   { [key: string]: PurpleResponse };
    security:    PostSecurity[];
}

export type PurpleParameter = {
    name:             string;
    in:               string;
    description:      string;
    required:         boolean;
    type:             string;
    items:            ParameterItems;
    collectionFormat: string;
}

export type ParameterItems = {
    type:    CodeType;
    enum:    string[];
    default: string;
}

export type PurpleResponse = {
    description: string;
    schema?:     ResponseSchema;
}

export type ResponseSchema = {
    type:  string;
    items: SchemaClass;
}

export type PetFindByTags = {
    get: PetFindByTagsGet;
}

export type PetFindByTagsGet = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    produces:    string[];
    parameters:  FluffyParameter[];
    responses:   { [key: string]: PurpleResponse };
    security:    PostSecurity[];
    deprecated:  boolean;
}

export type FluffyParameter = {
    name:             string;
    in:               string;
    description:      string;
    required:         boolean;
    type:             string;
    items:            Message;
    collectionFormat: string;
}

export type PetPetID = {
    get:    PetPetIDGet;
    post:   PetPetIDPost;
    delete: PetPetIDDelete;
}

export type PetPetIDDelete = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    produces:    string[];
    parameters:  TentacledParameter[];
    responses:   { [key: string]: The405 };
    security:    PostSecurity[];
}

export type TentacledParameter = {
    name:         string;
    in:           string;
    required:     boolean;
    type:         CodeType;
    description?: string;
    format?:      Format;
    minimum?:     number;
    maximum?:     number;
}

export type PetPetIDGet = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    produces:    string[];
    parameters:  TentacledParameter[];
    responses:   { [key: string]: PostResponse };
    security:    PurpleSecurity[];
}

export type PostResponse = {
    description: string;
    schema?:     SchemaClass;
}

export type PurpleSecurity = {
    api_key: any[];
}

export type PetPetIDPost = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    consumes:    string[];
    produces:    string[];
    parameters:  TentacledParameter[];
    responses:   PurpleResponses;
    security:    PostSecurity[];
}

export type PetPetIDUploadImage = {
    post: PetPetIDUploadImagePost;
}

export type PetPetIDUploadImagePost = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    consumes:    string[];
    produces:    string[];
    parameters:  TentacledParameter[];
    responses:   FluffyResponses;
    security:    PostSecurity[];
}

export type FluffyResponses = {
    "200": Purple200;
}

export type Purple200 = {
    description: string;
    schema:      SchemaClass;
}

export type StoreInventory = {
    get: StoreInventoryGet;
}

export type StoreInventoryGet = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    produces:    string[];
    parameters:  any[];
    responses:   TentacledResponses;
    security:    PurpleSecurity[];
}

export type TentacledResponses = {
    "200": Fluffy200;
}

export type Fluffy200 = {
    description: string;
    schema:      The200_Schema;
}

export type The200_Schema = {
    type:                 string;
    additionalProperties: Code;
}

export type StoreOrder = {
    post: StoreOrderPost;
}

export type StoreOrderPost = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    consumes:    string[];
    produces:    string[];
    parameters:  PutParameter[];
    responses:   { [key: string]: PostResponse };
}

export type StoreOrderOrderID = {
    get:    StoreOrderOrderIDGet;
    delete: StoreOrderOrderIDDelete;
}

export type StoreOrderOrderIDDelete = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    produces:    string[];
    parameters:  TentacledParameter[];
    responses:   { [key: string]: The405 };
}

export type StoreOrderOrderIDGet = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    produces:    string[];
    parameters:  TentacledParameter[];
    responses:   { [key: string]: PostResponse };
}

export type UserClass = {
    post: UserPost;
}

export type UserPost = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    consumes:    string[];
    produces:    string[];
    parameters:  PutParameter[];
    responses:   StickyResponses;
}

export type StickyResponses = {
    default: The405;
}

export type UserCreateWith = {
    post: GetClass;
}

export type GetClass = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    consumes?:   string[];
    produces:    string[];
    parameters:  StickyParameter[];
    responses:   StickyResponses;
}

export type StickyParameter = {
    in:          string;
    name:        string;
    description: string;
    required:    boolean;
    schema:      ResponseSchema;
}

export type UserLogin = {
    get: UserLoginGet;
}

export type UserLoginGet = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    produces:    string[];
    parameters:  TentacledParameter[];
    responses:   { [key: string]: FluffyResponse };
}

export type FluffyResponse = {
    description: string;
    headers?:    Headers;
    schema?:     Message;
}

export type Headers = {
    "X-Expires-After": UserStatus;
    "X-Rate-Limit":    UserStatus;
}

export type UserLogout = {
    get: GetClass;
}

export type UserUsername = {
    get:    UserUsernameGet;
    put:    UserUsernamePut;
    delete: UserUsernameDelete;
}

export type UserUsernameDelete = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    produces:    string[];
    parameters:  PutParameter[];
    responses:   { [key: string]: The405 };
}

export type UserUsernameGet = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    produces:    string[];
    parameters:  PutParameter[];
    responses:   { [key: string]: PostResponse };
}

export type UserUsernamePut = {
    tags:        string[];
    summary:     string;
    description: string;
    operationId: string;
    consumes:    string[];
    produces:    string[];
    parameters:  PutParameter[];
    responses:   { [key: string]: The405 };
}

export type SecurityDefinitions = {
    api_key:       APIKey;
    petstore_auth: PetstoreAuthClass;
}

export type APIKey = {
    type: string;
    name: string;
    in:   string;
}

export type PetstoreAuthClass = {
    type:             string;
    authorizationUrl: string;
    flow:             string;
    scopes:           Scopes;
}

export type Scopes = {
    "read:pets":  string;
    "write:pets": string;
}

export type Tag = {
    name:          string;
    description:   string;
    externalDocs?: ExternalDocs;
}
