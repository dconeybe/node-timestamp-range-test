# node-timestamp-range-test

A small application to test how Cloud Firestore handles out-of-range timestamp values in document values.

## Introduction

This small application was used to test how the Cloud Firestore
(https://cloud.google.com/firestore) handles timestamp values in documents
whose seconds fall outside if the valid boundaries.

This application was created to determine if and how the Cloud Firestore backend
handles invalid timestamps while working on
https://github.com/googleapis/nodejs-firestore/pull/947.

## Setup

To prepare to use this application, issue the following commands:

```
npm install
tsc
```

Then set up Application Default Credentials (ADC) to specify the project to use.  See
https://cloud.google.com/docs/authentication/production#finding_credentials_automatically
for details.

## Usage

```
node dist/app.ts --seconds=<seconds> --document=<document_path>
```

The `<seconds>` argument is the value for "seconds" to specify to the
Timestamp object that will be used as a value in the document. It may be any
integer, or one of the following predefined values:
* min (the smallest valid value)
* min-1 (one smaller than min)
* max (the largest valid value)
* max+1 (one larger than max)

The `<document_path>` argument is the path of the document in Cloud Firestore
to which to write. Example: `"docs/TimestampTest"`
