# PDF Workflow

![example workflow](/diagrams/EXAMPLE_PROJECT_WORKFLOW_IMAGE.jpg)

This project is a companion to my upcoming LogRocket post on PDF workflow development.

The project actually consists of:
- a .NET API in the `backend` folder
- a nextjs React project in the `frontend` folder

This project was also generated with the help of [claude.ai](https://claude.ai/new).

## Running Locally

On the frontend you just need to go into the `repair-shop` folder and run an `npm install` and then `npm run dev` to see it hosted on `localhost:3000`

To correctly use the Azure parts that are called by the backend:
- create an Azure Account
- create a [Azure Blob Storage service instance](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction)
- create a `container` in your Blob Storage Service called `reports` [see documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal)
- retrieve the Azure Blob Storage connection string and put that in the `appsettings.json` file as such:

```json
    {
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "AzureStorage": "<YOUR_CONNECTION_STRING_GOES_HERE>"
  },
  "BlobStorage": {
    "ContainerName": "reports"
  }
}
```

With a terminal, on the backend go into `RepairShopApi` and run `dotnet build` and then `dotnet run` to see the project running on `localhost:5039`. You can run just the API via swagger at http://localhost:5039/swagger/index.html.