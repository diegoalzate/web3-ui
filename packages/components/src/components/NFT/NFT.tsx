// import React, { useCallback, useEffect, useRef } from 'react';
import React, { useEffect } from 'react';
// import { useNFTsByOwner } from '@web3-ui/hooks';
import { Alchemy } from 'alchemy-sdk';
import { useQuery } from 'react-query';

// Using default settings - pass in a settings object to specify your API key and network
const alchemy = new Alchemy();

export type NFTProps = {
  /**
   * The address of the NFT contract.
   */
  contractAddress?: string;
  /**
   * The id of the NFT.
   */
  tokenId?: string;
  /**
   * The size of the NFT card.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export interface NFTData {
  tokenId: string;
  imageUrl?: string;
  name: string | null;
  assetContractSymbol: string;
  assetContractName: string;
  animationUrl?: string;
}

type getNFTMetadataProps = {
  contractAddress?: string;
  tokenId?: string;
};

/**
 * Component to fetch and display NFT data
 */
export const NFT = ({ contractAddress, tokenId, size = 'xs' }: NFTProps) => {
  const { data, isLoading } = useQuery(
    ['getNFTMetadata', contractAddress, tokenId],
    () => {
      return fetchNft({
        contractAddress,
        tokenId,
      });
    },
    {
      enabled: !!contractAddress && !!tokenId,
    }
  );

  const fetchNft = async ({
    contractAddress,
    tokenId,
  }: getNFTMetadataProps) => {
    if (!contractAddress || !tokenId) return null;
    const data = await alchemy.nft.getNftMetadata(contractAddress!, tokenId!);
    return data;
  };

  console.log(data);

  return <div>nft here</div>;
};
