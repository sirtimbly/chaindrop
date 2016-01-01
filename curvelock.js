var sodium = require('libsodium-wrappers');

module.exports = {
    var ID_VERSION = 0x0A;
    encryptMessage: function(msg, toId, callback) {
        //generate an ephemeral key to encrypt this with
      var key = PublicKeyBox.GenerateKeyPair();

      //decode the recip ID
      var recip = Base58Check.Base58CheckEncoding.Decode(toId);

      //Check to make sure that the ID version is supported
      if (recip[0] != ID_VERSION)
      {
        throw new CryptographicException("Invalid ID Format.");
      }

      var nonce = SodiumCore.GetRandomBytes(24);
      var encrypted = PublicKeyBox.Create(message, nonce, key.PrivateKey, ArrayHelpers.SubArray(recip, 1));
      var recipVerifier = GenericHash.Hash(ArrayHelpers.ConcatArrays(nonce, key.PublicKey), null, 16);
      var version = new byte[] {0x00};

      var final = ArrayHelpers.ConcatArrays(version, nonce, key.PublicKey, recipVerifier, encrypted);

      return final;
    }
}