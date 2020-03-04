// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Firestore, Timestamp } from "@google-cloud/firestore";
import { argv } from "yargs";

function getTimestampFromArgs() {
  const secondsStr = argv.seconds;
  if (!secondsStr) {
    throw new RangeError("--seconds must be specified.");
  } else if (secondsStr === "min") {
    return new Timestamp(-62135596800, 0);
  } else if (secondsStr === "min-1") {
    return new Timestamp(-62135596801, 0);
  } else if (secondsStr === "max") {
    return new Timestamp(253402300799, 999999999);
  } else if (secondsStr === "max+1") {
    return new Timestamp(253402300800, 0);
  } else {
    const seconds = Number(secondsStr);
    return new Timestamp(seconds, 0);
  }
}

async function applyTimestamp(
  firestore: Firestore,
  documentPath: string,
  timestamp: Timestamp
) {
  console.log(
    "Setting 'value' key of document " +
      documentPath +
      " to a timestamp with seconds=" +
      timestamp.seconds
  );

  await firestore.doc(documentPath).set({ value: timestamp });

  console.log("Document.set() completed.");
}

function main() {
  const timestamp = getTimestampFromArgs();
  const documentPath = argv.document_path;
  if (!documentPath) {
    throw new RangeError("--document_path must be specified.");
  }

  const firestore = new Firestore();

  return applyTimestamp(firestore, String(documentPath), timestamp);
}

main();
