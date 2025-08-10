# Box Script

## Description

<p>Generates array of bits from 32 byte hex numbers into configuration of blocks, takes screenshot and genrates mp4.</p>
<p>Use setInput function in src/index.js to pass array of hex values.</p>

### Example

<p>Input array items should be formatted like so: </p>

```setInput(['ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff'])```

<p>The above would return 1 full layer of blocks.</p>

```setInput(```
    ```[```
        ```'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff', ```
        ```'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff' ```
    ```]```
```)```

<p>The above would return 2 full layers of blocks.</p>

## NOTE

<p>Values are passed in pairs i.e to pass '1' you would write '01'. Like so:</p>

```setInput(['0100ffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff'])```

<p>The above would return 1 block in the first row of the first layer and fill all other rows in the first layer.</p>


### DEMO

<p>Clone the file and run index file in src like so to receive default values:</p>

```npm start```

