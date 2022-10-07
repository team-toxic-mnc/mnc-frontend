import { Tag } from '@chakra-ui/tag';
import { Player } from '../types/domain/Player';
import { getMmrColor, getMmrValue } from '../utils/mmrHelpers';

export const MmrTag = ({
    player,
    props,
}: {
    player: Player;
    props?: { size?: string };
}) => {
    const mmr = getMmrValue(player);

    if (mmr === 0) {
        return <></>;
    }
    return (
        <Tag
            textAlign='center'
            bg={getMmrColor(mmr)}
            color={'gray.600'}
            borderRadius='full'
            size={props?.size}
        >
            {mmr}
        </Tag>
    );
};
