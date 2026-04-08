package net.bank.banking.service.impl;

import net.bank.banking.dto.AccountDto;
import net.bank.banking.entity.Account;
import net.bank.banking.mapper.AccountMapper;
import net.bank.banking.repository.AccountRepository;
import net.bank.banking.service.AccountService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    private AccountRepository accountRepository;


    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public AccountDto createAccount(AccountDto accountDto) {

    Account account = AccountMapper.mapToAccount(accountDto);
    Account saveAccount = accountRepository.save(account);
        return AccountMapper.mapToAccountDto(saveAccount);
    }

    @Override
    public AccountDto getAccountById(Long id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Acount does not exist"));
        return AccountMapper.mapToAccountDto(account);
    }

    @Override
    public AccountDto deposit(long id, double amount ) {
        Account account1 = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account does not exist"));
        double total = account1.getBalance() + amount ;
        account1.setBalance(total);
        Account saveAccount = accountRepository.save(account1);

        return AccountMapper.mapToAccountDto(saveAccount);
    }

    @Override
    public AccountDto withdraw(long id, double amount) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not fount"));
        if(account.getBalance() < amount) {
            throw new RuntimeException("insuficiant amount");
        }
        double total = account.getBalance() - amount;
        account.setBalance(total);
        Account saveAccount = accountRepository.save(account);
        return AccountMapper.mapToAccountDto(saveAccount);
    }

    @Override
    public List<AccountDto> getAllAccount() {
        List<Account> accounts = accountRepository.findAll();
       return accounts.stream().map(account -> AccountMapper.mapToAccountDto(account)).collect(Collectors.toList());

    }

    @Override
    public void deleteAccountById(long id) {

        Account account = accountRepository.findById(id).orElseThrow(()-> new RuntimeException("Account does not exist"));

        accountRepository.deleteById(id);
    }


}
