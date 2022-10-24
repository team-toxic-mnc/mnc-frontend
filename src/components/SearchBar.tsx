import { Icon } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';

enum SearchOptionType {
    player,
    champion,
}

type SearchOption =
    | {
          name: string;
          variant: SearchOptionType;
      }
    | undefined
    | null;

export const SearchBar = () => {
    const navigate = useNavigate();

    const championsResponse = ToxicDataService.useChampions();
    const championOptions = Array.from(
        Object.values(championsResponse.data ?? {})
    ).map((champion) => {
        return {
            name: champion.name,
            variant: SearchOptionType.champion,
        };
    });

    const playersResponse = ToxicDataService.usePlayers();
    const playerOptions = playersResponse.data
        ? playersResponse.data.map((player) => {
              return {
                  name: player.name,
                  variant: SearchOptionType.player,
              };
          })
        : [];

    const searchOptions = championOptions
        .concat(playerOptions)
        .sort((o1, o2) => {
            const name1 = o1.name.toUpperCase();
            const name2 = o2.name.toUpperCase();
            if (name1 < name2) {
                return -1;
            }
            if (name1 > name2) {
                return 1;
            }
            return 0;
        });

    const formatOptionLabel = (option: SearchOption) => {
        if (option) {
            return option.name + ' (' + SearchOptionType[option.variant] + ')';
        }
        return '';
    };

    const navigateToPage = (option: SearchOption | null) => {
        if (option) {
            if (option.variant === SearchOptionType.champion) {
                navigate('/championOverview/' + option.name);
            } else if (option.variant === SearchOptionType.player) {
                navigate('/playerOverview/' + option.name.toLowerCase());
            }
            window.scrollTo(0, 0);
        }
    };

    return (
        <>
            <Select
                value={null}
                options={searchOptions}
                getOptionLabel={(option) => formatOptionLabel(option)}
                isSearchable
                isClearable
                blurInputOnSelect
                controlShouldRenderValue={false}
                openMenuOnClick={false}
                onChange={(option) => navigateToPage(option)}
                placeholder='Search...'
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => <Icon as={FiSearch} margin='1' />,
                }}
                styles={{
                    input: (provided: any) => ({
                        ...provided,
                        minWidth: '100px',
                    }),
                }}
            ></Select>
        </>
    );
};
