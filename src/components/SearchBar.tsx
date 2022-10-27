import {
    Icon,
    IconButton,
    Modal,
    ModalContent,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { OptionProps, Select } from 'chakra-react-select';
import { FiSearch } from 'react-icons/fi';
import { Search, useNavigate } from 'react-router-dom';
import { ARTICLES, NewsCardData } from '../news/NewsData';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import { Champion } from '../types/domain/Champion';
import { Player } from '../types/domain/Player';

type SearchOption =
    | {
          label: string;
          path: string;
      }
    | undefined
    | null;

type SearchOptionGroup = {
    label: string;
    options: SearchOption[];
};

const getChampionOption = (champion: Champion): SearchOption => {
    return {
        label: champion.name,
        path: '/championOverview/' + champion.name,
    };
};

const getPlayerOption = (player: Player): SearchOption => {
    return {
        label: player.name,
        path: '/playerOverview/' + player.name.toLowerCase(),
    };
};

const getArticleOption = (article: NewsCardData): SearchOption => {
    return {
        label: article.title,
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

    const searchOptions: SearchOptionGroup[] = [
        { label: 'Champions', options: championOptions },
        { label: 'Players', options: playerOptions },
        { label: 'Articles', options: articleOptions },
    ];

    const navigateToPage = (option: SearchOption) => {
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
                    <Select<SearchOption, false, SearchOptionGroup>
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
                                <Icon as={FiSearch} margin='4' />
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
