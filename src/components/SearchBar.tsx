import {
    Icon,
    IconButton,
    Modal,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Select } from 'chakra-react-select';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import { ARTICLES, NewsCardData } from '../news/NewsData';
import { Champion } from '../types/domain/Champion';
import { Player } from '../types/domain/Player';

type SearchOption =
    | {
          label: string;
          path: string;
      }
    | undefined
    | null;

const getChampionOption = (champion: Champion): SearchOption => {
    return {
        label: champion.name + ' (champion)',
        path: '/championOverview/' + champion.name,
    };
};

const getPlayerOption = (player: Player): SearchOption => {
    return {
        label: player.name + ' (player)',
        path: '/playerOverview/' + player.name.toLowerCase(),
    };
};

const getArticleOption = (article: NewsCardData): SearchOption => {
    return {
        label: article.title + ' (article)',
        path: '/news/' + article.id,
    };
};

export const SearchBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const championsResponse = ToxicDataService.useChampions();
    const championOptions = Array.from(
        Object.values(championsResponse.data ?? {})
    ).map((champion) => getChampionOption(champion));

    const playersResponse = ToxicDataService.usePlayers();
    const playerOptions = playersResponse.data
        ? playersResponse.data.map((player) => getPlayerOption(player))
        : [];

    const articleOptions = ARTICLES.map((article) => getArticleOption(article));

    const searchOptions = championOptions
        .concat(playerOptions)
        .concat(articleOptions)
        .sort((o1, o2) => {
            const name1 = o1?.label.toUpperCase();
            const name2 = o2?.label.toUpperCase();
            if (name1 && name2) {
                if (name1 < name2) {
                    return -1;
                }
                if (name1 > name2) {
                    return 1;
                }
            }
            return 0;
        });

    const navigateToPage = (option: SearchOption | null) => {
        if (option) {
            onClose();
            navigate(option.path);
            window.scrollTo(0, 0);
        }
    };

    return (
        <>
            <IconButton
                onClick={onOpen}
                icon={<FiSearch />}
                variant='ghost'
                aria-label='Search'
                size='lg'
            ></IconButton>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent marginX='4px'>
                    <Select
                        value={null}
                        options={searchOptions}
                        isSearchable
                        isClearable
                        blurInputOnSelect
                        controlShouldRenderValue={false}
                        openMenuOnClick={false}
                        onChange={(option) => navigateToPage(option)}
                        placeholder='Search...'
                        components={{
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => (
                                <Icon as={FiSearch} margin='1' />
                            ),
                        }}
                        chakraStyles={{
                            input: (provided: any) => ({
                                ...provided,
                            }),
                        }}
                    ></Select>
                </ModalContent>
            </Modal>
        </>
    );
};
